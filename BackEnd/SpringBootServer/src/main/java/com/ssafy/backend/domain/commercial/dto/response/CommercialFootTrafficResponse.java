package com.ssafy.backend.domain.commercial.dto.response;


import com.ssafy.backend.domain.commercial.dto.info.*;

public record CommercialFootTrafficResponse(
    CommercialTimeSlotFootTrafficInfo timeSlotFootTraffic,
    CommercialDayOfWeekFootTrafficInfo dayOfWeekFootTraffic,
    CommercialAgeGroupFootTrafficInfo ageGroupFootTraffic,
    CommercialAgeGenderFootTrafficInfo ageGenderFootTraffic
) {
}
