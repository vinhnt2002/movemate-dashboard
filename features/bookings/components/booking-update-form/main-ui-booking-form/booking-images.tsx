"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ImagePlus, Video } from "lucide-react";
import { BookingTracker } from "../../../types/booking-type";
import ImageLightbox from "@/components/modals/full-box-image";

interface BookingImagesAndVideosProps {
  bookingTrackers: BookingTracker[] | undefined;
}

const BookingImagesAndVideos = ({
  bookingTrackers,
}: BookingImagesAndVideosProps) => {
  const pendingBookingTrackers = bookingTrackers?.filter(
    (tracker) => tracker.type === "PENDING"
  );

  const allImages =
    pendingBookingTrackers?.flatMap(
      (tracker) =>
        tracker.trackerSources?.filter(
          (source) => source.resourceUrl && source.type === "IMG"
        ) || []
    ) || [];

  const allVideos =
    pendingBookingTrackers?.flatMap(
      (tracker) =>
        tracker.trackerSources?.filter(
          (source) => source.resourceUrl && source.type === "VIDEO"
        ) || []
    ) || [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-medium">
          <ImagePlus className="h-4 w-4 mr-2" />
          Hình ảnh nhà khách hàng ({allImages.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3 overflow-x-auto py-2">
          {allImages.map((image, index) => (
            <div
              key={image.id || index}
              className="w-[150px] h-[150px] flex-shrink-0 relative rounded-md overflow-hidden border border-gray-200"
            >
              {image.resourceUrl ? (
                <ImageLightbox
                  src={image.resourceUrl}
                  alt={`Ảnh đơn hàng ${index + 1}`}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                  Image not found
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      {allVideos.length > 0 && (
        <>
          <CardHeader className="pb-3 mt-4">
            <CardTitle className="flex items-center text-base font-medium">
              <Video className="h-4 w-4 mr-2" />
              Video nhà khách hàng ({allVideos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3 overflow-x-auto py-2">
              {allVideos.map((video, index) => (
                <div
                  key={video.id || index}
                  className="w-[240px] h-[135px] flex-shrink-0 relative rounded-md overflow-hidden border border-gray-200 shadow-md"
                >
                  {video.resourceUrl ? (
                    <video
                      src={video.resourceUrl}
                      controls
                      className="object-cover w-full h-full"
                      style={{ maxHeight: "205px" }} 
                    >
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                      Video not found
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default BookingImagesAndVideos;