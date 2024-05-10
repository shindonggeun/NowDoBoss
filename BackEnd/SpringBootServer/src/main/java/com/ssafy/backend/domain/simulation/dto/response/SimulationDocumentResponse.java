package com.ssafy.backend.domain.simulation.dto.response;

import com.ssafy.backend.domain.simulation.document.SimulationDocument;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SimulationDocumentResponse {
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

    public SimulationDocumentResponse(SimulationDocument simulationDocument) {
        this.id = simulationDocument.getId();
        this.memberId = simulationDocument.getMemberId();
        this.totalPrice = simulationDocument.getTotalPrice();
        this.isFranchisee = simulationDocument.getIsFranchisee();
        this.brandName = simulationDocument.getBrandName();
        this.gugun = simulationDocument.getGugun();
        this.serviceCode = simulationDocument.getServiceCode();
        this.serviceCodeName = simulationDocument.getServiceCodeName();
        this.storeSize = simulationDocument.getStoreSize();
        this.floor = simulationDocument.getFloor();
    }
}