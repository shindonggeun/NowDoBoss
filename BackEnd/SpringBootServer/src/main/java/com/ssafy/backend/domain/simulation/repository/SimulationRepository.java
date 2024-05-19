package com.ssafy.backend.domain.simulation.repository;

import com.ssafy.backend.domain.simulation.document.SimulationDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ExistsQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SimulationRepository extends MongoRepository<SimulationDocument, String> {
    @ExistsQuery("{ 'memberId' : ?#{#info.memberId}, 'totalPrice' : ?#{#info.totalPrice}, 'isFranchisee' : ?#{#info.isFranchisee}, 'brandName' : ?#{#info.brandName}, 'gugun' : ?#{#info.gugun}, 'serviceCode' : ?#{#info.serviceCode}, 'serviceCodeName' : ?#{#info.serviceCodeName}, 'storeSize' : ?#{#info.storeSize}, 'floor' : ?#{#info.floor} }")
    boolean existsBySimulationDocument(SimulationDocument info);

    Page<SimulationDocument> findByMemberId(Long memberId, Pageable pageable);

    void deleteByMemberId(Long memberId);
}
