package com.ssafy.backend.domain.support.service;

import com.ssafy.backend.domain.support.dto.response.StartupSupportListResponse;
import com.ssafy.backend.domain.support.repository.StartupSupportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StartupSupportServiceImpl implements StartupSupportService {
    private final StartupSupportRepository startupSupportRepository;

    @Override
    public List<StartupSupportListResponse> selectSupport(Long lastId) {
        return startupSupportRepository.selectSupport(lastId);
    }
}
