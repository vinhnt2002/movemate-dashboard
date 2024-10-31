"use client";
import React from "react";
import { IBooking } from "../../../type/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Edit, Plus, Package } from "lucide-react";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import {
  ServiceType,
  ServiceTypeIcons,
} from "@/features/services/enums/service-enum";

interface DetailServicesProps {
  booking: IBooking | null;
}

const DetailServices = ({ booking }: DetailServicesProps) => {
  const { onOpen } = useModal();

  return (
    <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center text-lg">
          <CalendarClock className="h-5 w-5 mr-2 text-primary" />
          Chi tiết dịch vụ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {booking?.bookingDetails && booking.bookingDetails.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {booking.bookingDetails.map((detail) => {
              const ServiceIcon = ServiceTypeIcons[detail.type as ServiceType];

              return (
                <div
                  key={detail.id}
                  className="rounded-lg p-4 border hover:border-primary transition-colors duration-200 shadow-sm"
                >
                  <div className="flex justify-between items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {ServiceIcon && (
                          <ServiceIcon className="h-4 w-4 text-primary" />
                        )}
                        <h3 className="font-semibold text-base">
                          {detail.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {detail.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          Số lượng:{" "}
                          <span className="font-medium text-foreground">
                            {detail.quantity}
                          </span>
                        </span>
                        <span className="text-muted-foreground">
                          Đơn giá:{" "}
                          <span className="font-medium text-foreground">
                            {formatter.format(detail.price!)}
                          </span>
                        </span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      className="hover:bg-primary/10"
                      onClick={() =>
                        onOpen("updateBookingServicesModalSheet", {
                          bookingDetail: detail,
                          bookingDetails: booking.bookingDetails,
                        })
                      }
                    >
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 rounded-lg border-2 border-dashed">
            <div className="text-center space-y-4">
              <Package className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                Chưa có dịch vụ nào được thêm
              </p>
              <Button
                onClick={() => onOpen("createNewServicesBookingModal", {})}
                variant="default"
                type="button"
                className="group hover:shadow-md transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Thêm dịch vụ mới
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailServices;