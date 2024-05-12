package com.ssafy.backend.domain.community.dto.response;

import com.ssafy.backend.domain.community.entity.enums.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PopularCommunityListResponse {
    private Long communityId;
    private Category category;
    private String title;
    private String content;
    private String image;
    private Long writerId;
    private String writerNickname;
    private String profileImage;
    private int readCount;
    private int commentCount;

    public PopularCommunityListResponse(Long communityId, Category category, String title,
                                 String content, Long writerId,
                                 String writerNickname, String profileImage,
                                 int readCount, int commentCount) {
        this.communityId = communityId;
        this.category = category;
        this.title = title;

        if (!content.isBlank()) {
            content = content.substring(0, Math.min(content.length(), 50));
        }

        this.content = content;
        this.writerId = writerId;
        this.writerNickname = writerNickname;
        this.profileImage = profileImage;
        this.readCount = readCount;
        this.commentCount = commentCount;
    }
}
