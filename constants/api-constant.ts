export const BASIC_URL ={
    GET_USERS : '/users',
    GET_TRANSACTIONS: "/transactions",
    WALLETS: "/wallets",
    STATISTIC:"/statistics/manager",
    WITHDRAWAL:"/wallets/withdrawal"
}

export const SERVICES_URL = {
  GET_SERVICES: "/services",
  CREATE_SERVICES: "/services/manage/create-service",
  UPDATE_SERVICES: "/services/manager",
  GET_HOUSE_TYPE: "/housetypes",
  GET_TRUCK_CATEGORY: "/truckcategorys",
  MANAGE_TRUCK_CATEGORY: "/truckcategorys/manager/truck-category",
  DELETE_TRUCK_CATEGORY : "/truckcategorys/manager/deleted"
};

export const BOOKING_URL = {
  GET_BOOKINGS : "/bookings",
  UPDATE_ROLL_BACK_REVIEWING: "/bookings/back",
  UPDATE_DETAILS_STATUS: "/bookingdetails/reviewer/update-status",
  UPDATE_BOOKING_STATUS: "/bookings/reviewer/update-booking",
  UPDATE_BOOKING_SCHEDULE: "/bookings/reviewer/review-at",
  REFUND: "/bookingtrackers",
  MONEYTARY : "/assignments/manager-resolve-exception"
};


export const ASSIGNMENT_URL = {
  ASSIGNMENTS : "/assignments",
  ASSIGNMENTS_WAITING : "/assignments/booking-detail-waiting",
  AUTO_ASSINGED_DRIVER: "assignments/assign-auto-by-manual-driver",
  AUTO_ASSINGED_PORTER: "assignments/assign-auto-by-manual-porter",
  MANUAL_ASSIGNED: "/assignments/assign-manual-staff",
  CHECK_DRIVER_ASSIGNMENT : "/assignments/available-driver",
  CHECK_PORTER_ASSIGNMENT : "/assignments/available-porter",
  UPDATE_BOOKING_DETAIL_AVAILABLE: "/bookingdetails/available"
}

export const FEE_URL = {
  GET_FEES : "/fees/system",
  FEES: "/FEES"
}


export const MANAGE_SCHEDULE_URL = {
  SCHEDULEWORKINGS : "/scheduleworkings",
  GROUP: "/groups"
}


export const PROMOTION = {
  PROMOTIONS: "/promotions"
}