package com.ssafy.backend.domain.share.repository;

import com.ssafy.backend.domain.share.entity.Share;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareRepository extends JpaRepository<Share, String> {
}
