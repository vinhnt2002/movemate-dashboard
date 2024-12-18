"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { IBooking } from "../types/booking-type";
import { BOOKING_URL } from "@/constants/api-constant";
import { auth } from "@/lib/next-auth/auth";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function updateDetailStatus(
  params: string,
  data?: any
): Promise<Result<void>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.UPDATE_DETAILS_STATUS}/${params}`, data)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/dashboard/bookings");

  // revalidatePath("/dashboard/bookings");
  // revalidatePath(`/dashboard/bookings/${params}`);
  // revalidatePath("/dashboard/bookings", "layout");
  return { success: true, data: undefined };
}

export async function updateBookingStatus(
  params: string,
  data: any
): Promise<Result<void>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.UPDATE_BOOKING_STATUS}/${params}`, data)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/bookings/${params}`);
  return { success: true, data: undefined };
}

export async function updateSchedule(
  params: string,
  data?: any
): Promise<Result<void>> {
  noStore();
  console.log(data);
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.UPDATE_BOOKING_SCHEDULE}/${params}`, data)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/dashboard/bookings");

  // revalidatePath("/dashboard/bookings");
  // revalidatePath(`/dashboard/bookings/${params}`);
  // revalidatePath("/dashboard/bookings", "layout");
  return { success: true, data: undefined };
}


export async function rollBackToReviewing(  params: string,): Promise<Result<void>>{
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.patch(`${BOOKING_URL.UPDATE_ROLL_BACK_REVIEWING}/${params}`)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/bookings/${params}`);
  return { success: true, data: undefined };
}


