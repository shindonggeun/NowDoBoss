package com.ssafy.backend.domain.community.dto;

import com.ssafy.backend.domain.community.entity.enums.Category;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityResponse {
    private Long communityId;
    private Category category;
    private String title;
    private String content;
    private int readCount;
    private Long writerId;
    private String writerNickname;
    private String writerProfileImage;
    private List<String> images;


    public CommunityResponse(Long communityId, Category category, String title, String content, int readCount, Long writerId, String writerNickname, String writerProfileImage) {
        this.communityId = communityId;
        this.category = category;
        this.title = title;
        this.content = content;
        this.readCount = readCount;
        this.writerId = writerId;
        this.writerNickname = writerNickname;
        this.writerProfileImage = writerProfileImage;
    }

}
