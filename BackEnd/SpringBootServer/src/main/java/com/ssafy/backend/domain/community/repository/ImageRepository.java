package com.ssafy.backend.domain.community.repository;

import com.ssafy.backend.domain.community.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Image i WHERE i.community.id = :communityId")
    void deleteByCommunityId(Long communityId);

    List<Long> findIdByCommunityId(Long communityId);

    List<Image> findByCommunityId(Long communityId);
}
