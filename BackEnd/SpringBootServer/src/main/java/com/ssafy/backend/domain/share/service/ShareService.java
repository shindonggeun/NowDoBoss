package com.ssafy.backend.domain.share.service;

import com.ssafy.backend.domain.share.dto.request.CreateShareRequest;
import com.ssafy.backend.domain.share.dto.response.LinkTokenResponse;
import com.ssafy.backend.domain.share.dto.response.ShareResponse;

public interface ShareService {
    LinkTokenResponse createShare(CreateShareRequest request);

    ShareResponse selectShare(String token);
}
