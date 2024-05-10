package com.ssafy.backend.domain.simulation.document;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder(toBuilder = true)
@Document(collection = "simulation")
public class SimulationDocument {
    @Id
    private String id;
    private Long memberId;
    private Long totalPrice;
    private Boolean isFranchisee;
    private String brandName;
    private String gugun;
    private String serviceCode;
    private String serviceCodeName;
    private int storeSize;
    private String floor;
}
