package com.ssafy.backend.domain.simulation.service;

import com.ssafy.backend.domain.simulation.dto.*;
import com.ssafy.backend.domain.simulation.entity.ServiceType;
import com.ssafy.backend.domain.simulation.exception.SimulationErrorCode;
import com.ssafy.backend.domain.simulation.exception.SimulationException;
import com.ssafy.backend.domain.simulation.repository.FranchiseeRepository;
import com.ssafy.backend.domain.simulation.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService {
    private final FranchiseeRepository franchiseeRepository;
    private final ServiceRepository serviceRepository;

    @Override
    public List<SearchFranchiseeResponse> searchFranchisee(SearchFranchiseeRequest request) {
        return franchiseeRepository.searchFranchisee(request);
    }

    @Override
    public StoreResponse selectStoreSize(String serviceCode) {
        ServiceType serviceType = serviceRepository.findByServiceCode(serviceCode)
                .orElseThrow(() -> new SimulationException(SimulationErrorCode.NOT_EXIST_SERVICE));

        return StoreResponse.builder()
                .small(SizeInfo.builder().squareMeter(serviceType.getSmallSize()).build())
                .medium(SizeInfo.builder().squareMeter(serviceType.getMediumSize()).build())
                .large(SizeInfo.builder().squareMeter(serviceType.getLargeSize()).build())
                .build();
    }

    @Override
    public SimulationResponse simulate(CreateSimulationRequest request) {
        return null;
    }
}
