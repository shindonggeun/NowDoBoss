package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {

}
