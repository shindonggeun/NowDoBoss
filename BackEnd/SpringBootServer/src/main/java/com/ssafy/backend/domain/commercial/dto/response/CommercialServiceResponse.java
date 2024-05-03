package com.ssafy.backend.domain.commercial.dto.response;

/**
 * 개별 서비스 업종의 코드와 이름을 반환하는 응답 DTO입니다.
 */
public record CommercialServiceResponse(
        String serviceCode,
        String serviceCodeName
) {
}
