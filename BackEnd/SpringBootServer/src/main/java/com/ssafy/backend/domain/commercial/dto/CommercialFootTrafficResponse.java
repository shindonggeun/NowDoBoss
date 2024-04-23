package com.ssafy.backend.domain.commercial.dto;

public record CommercialFootTrafficResponse(
    CommercialTimeSlotFootTrafficInfo timeSlotFootTraffic,
    CommercialDayOfWeekFootTrafficInfo dayOfWeekFootTraffic,
    CommercialAgeGroupFootTrafficInfo ageGroupFootTraffic

) {
}
