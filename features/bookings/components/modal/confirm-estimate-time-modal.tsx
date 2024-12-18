"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDetailStatus } from "../../action/update-booking";
import { useGetDurationVietmap } from "../../react-query/query";
import { Skeleton } from "@/components/ui/skeleton";

export const ConfirmEstimatedTimeModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "confirmEstimatedTimeModal";
  const params = useParams();

  const isReviewOnline = data.booking?.isReviewOnline;
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [unit, setUnit] = useState("phút");

  const { data: vietmapData, isLoading } = useGetDurationVietmap(
    data.booking?.pickupPoint!,
    data.booking?.deliveryPoint!
  );

  const duration = vietmapData?.durations[1][0]! || 0;
  const distance = vietmapData?.distances[1][0]! || 0;

  // Convert duration from seconds to minutes
  const durationInMinutes = Math.ceil(duration / 60);

  const onConfirmUpdate = async () => {
    try {
      const estimatedTimeInMinutes =
        unit === "giờ" ? estimatedTime * 60 : estimatedTime;

      // Validate if estimated time is less than duration
      if (estimatedTimeInMinutes < durationInMinutes) {
        toast.error(
          `Thời gian ước tính phải lớn hơn thời gian di chuyển tối thiểu (${durationInMinutes} phút)`
        );
        return;
      }

      const estimatedTimeInHours = estimatedTimeInMinutes / 60;
      const dataToSend = {
        estimatedDeliveryTime: estimatedTimeInHours,
      };

      const result = await updateDetailStatus(params.id.toString(), dataToSend);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Thời gian ước tính đã được cập nhật thành công");
      onClose();
    } catch (error) {
      toast.error("Lỗi khi cập nhật thời gian ước tính");
    }
  };

  if (!isReviewOnline) {
    return (
      <Dialog open={isOpenModal} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center p-6 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500" />
            <h2 className="mt-4 text-xl font-semibold">Cảnh báo</h2>
            <p className="mt-2 text-sm">
              Tính năng này chỉ khả dụng trên thiết bị di động. Vui lòng sử dụng
              thiết bị di động để cập nhật thời gian ước tính.
            </p>

            <div className="mt-8 w-full space-x-3 flex items-center justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
                className="min-w-[100px]"
              >
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderDurationContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
          <Skeleton className="h-4 w-1/2 bg-gray-200" />
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-md">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            Thời gian di chuyển tối thiểu: {durationInMinutes} phút
          </span>
        </div>
        <p className="text-sm text-gray-500 italic px-4">
          Lưu ý: Thời gian ước tính phải lớn hơn thời gian di chuyển tối thiểu
        </p>
      </>
    );
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật đề xuất cho khách hàng</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {renderDurationContent()}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Thời gian Ước tính
            </Label>
            {isLoading ? (
              <>
                <Skeleton className="h-10 col-span-2 bg-gray-200" />
                <Skeleton className="h-10 col-span-1 bg-gray-200" />
              </>
            ) : (
              <>
                <Input
                  id="time"
                  type="number"
                  min={durationInMinutes}
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(Number(e.target.value))}
                  className="col-span-2 bg-primary-100 border-primary-300 focus:ring-primary-500 focus:border-primary-500"
                  disabled={isLoading}
                />
                <div className="col-span-1">
                  <Select
                    value={unit}
                    onValueChange={setUnit}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="bg-primary-100 border-primary-300 focus:ring-primary-500 focus:border-primary-500">
                      <SelectValue>
                        {unit === "phút" ? "Phút" : "Giờ"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phút">Phút</SelectItem>
                      <SelectItem value="giờ">Giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onConfirmUpdate}
            className="bg-orange-500 hover:bg-orange-200 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Đang tải..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
