package com.ssafy.backend.domain.share.service;

import com.ssafy.backend.domain.share.dto.request.CreateShareRequest;
import com.ssafy.backend.domain.share.dto.response.LinkTokenResponse;

public interface ShareService {
    LinkTokenResponse createShare(CreateShareRequest request);
}
