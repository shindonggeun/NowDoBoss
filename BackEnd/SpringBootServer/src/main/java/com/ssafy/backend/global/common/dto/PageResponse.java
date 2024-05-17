package com.ssafy.backend.global.common.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> data;
    private PageInfo pageInfo;

    private PageResponse(Page<T> items) {
        this.data = items.getContent();
        this.pageInfo = PageInfo.builder()
                .page(items.getNumber())
                .size(items.getSize())
                .totalElements(items.getNumberOfElements())
                .totalPages(items.getTotalPages())
                .build();
    }

    public static <T> PageResponse<T> of(Page<T> items) {
        return new PageResponse<>(items);
    }

    @Getter
    @NoArgsConstructor
    private static class PageInfo {
        private int page;   // 페이지 번호
        private int size;   // 페이지 크기
        private int totalElements;    // 현재 페이지에 나올 데이터 수
        private int totalPages;    // 전체 페이지 번호

        @Builder
        public PageInfo(int page, int size, int totalElements, int totalPages) {
            this.page = page + 1;
            this.size = size;
            this.totalElements = totalElements;
            this.totalPages = totalPages;
        }
    }
}
