package com.ssafy.backend.domain.commercial.document;

import com.ssafy.backend.domain.district.entity.enums.ServiceType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "commercial_analysis")
public class CommercialAnalysis {
    @Id
    private String id;

    @Field("member_id")
    private Long memberId;

    @Field("district_code")
    private String districtCode;

    @Field("district_code_name")
    private String districtCodeName;

    @Field("administration_code")
    private String administrationCode;

    @Field("administration_code_name")
    private String administrationCodeName;

    @Field("commercial_code")
    private String commercialCode;

    @Field("commercial_code_name")
    private String commercialCodeName;

    @Field("service_type")
    private ServiceType serviceType;

    @Field("service_code")
    private String serviceCode;

    @Field("service_code_name")
    private String serviceCodeName;

    @CreatedDate
    @Field("created_at")
    private LocalDateTime createdAt;
}
