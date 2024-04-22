package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
