package com.ssafy.backend.domain.support.service;

import com.ssafy.backend.domain.support.dto.response.StartupSupportListResponse;

import java.util.List;

public interface StartupSupportService {
    List<StartupSupportListResponse> selectSupport(Long lastId);
}
