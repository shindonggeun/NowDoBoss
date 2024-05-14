package com.ssafy.backend.domain.share.service;

import com.ssafy.backend.domain.share.dto.request.CreateShareRequest;
import com.ssafy.backend.domain.share.dto.response.LinkTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ShareServiceImpl implements ShareService {

    @Override
    public LinkTokenResponse createShare(CreateShareRequest request) {

        return null;
    }
}
