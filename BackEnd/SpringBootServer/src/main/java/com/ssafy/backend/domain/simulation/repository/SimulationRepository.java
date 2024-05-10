package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.document.SimulationDocument;
import org.springframework.data.mongodb.repository.ExistsQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SimulationRepository extends MongoRepository<SimulationDocument, String> {
    @ExistsQuery("{ 'memberId' : ?#{#info.memberId}, 'totalPrice' : ?#{#info.totalPrice}, 'isFranchisee' : ?#{#info.isFranchisee}, 'brandName' : ?#{#info.brandName}, 'gugun' : ?#{#info.gugun}, 'serviceCode' : ?#{#info.serviceCode}, 'serviceCodeName' : ?#{#info.serviceCodeName}, 'storeSize' : ?#{#info.storeSize}, 'floor' : ?#{#info.floor} }")
    boolean existsBySimulationDocument(SimulationDocument info);
}
