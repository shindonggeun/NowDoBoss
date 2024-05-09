package com.ssafy.backend.global.component.firebase.repository;

import com.ssafy.backend.global.component.firebase.entity.DeviceToken;
import com.ssafy.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DeviceTokenRepository extends JpaRepository<DeviceToken, String> {
    @Query("SELECT dt.token FROM DeviceToken dt WHERE dt.member = :member")
    Optional<List<String>> findTokenAllByMember(Member member);
    @Query("SELECT dt.token FROM DeviceToken dt")
    Optional<List<String>> findTokenAll();

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM DeviceToken d WHERE d.member.id = :memberId")
    void deleteByMemberId(Long memberId);
}
