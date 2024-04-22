package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {
}
