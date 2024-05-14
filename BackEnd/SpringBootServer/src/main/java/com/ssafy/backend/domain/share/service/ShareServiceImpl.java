package com.ssafy.backend.domain.share.service;

import com.ssafy.backend.domain.share.dto.request.CreateShareRequest;
import com.ssafy.backend.domain.share.dto.response.LinkTokenResponse;
import com.ssafy.backend.domain.share.dto.response.ShareResponse;
import com.ssafy.backend.domain.share.entity.Share;
import com.ssafy.backend.domain.share.exception.ShareErrorCode;
import com.ssafy.backend.domain.share.exception.ShareException;
import com.ssafy.backend.domain.share.repository.ShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ShareServiceImpl implements ShareService {
    private final ShareRepository shareRepository;

    @Override
    public LinkTokenResponse createShare(CreateShareRequest request) {
        Share share = request.toEntity();
        shareRepository.save(share);
        return new LinkTokenResponse(share.getToken());
    }

    @Override
    public ShareResponse selectShare(String token) {
        Share share = shareRepository.findById(token)
                .orElseThrow(() -> new ShareException(ShareErrorCode.NOT_EXIST_SHARE));

        return ShareResponse.of(share);
    }
}
