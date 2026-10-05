import apiClient from "@/lib/apiClient";
import type { ApiResponse, PublicDoctorProfile } from "@/types";
import {
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types/appointment.types";

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function getMyAppointments(params: { page?: number; limit?: number }) {
  return apiClient<
    ApiResponse<{ doctor: PublicDoctorProfile; id: string; status: string }[]>
  >("/appointment/my-appointments", {
    params,
  });
}
