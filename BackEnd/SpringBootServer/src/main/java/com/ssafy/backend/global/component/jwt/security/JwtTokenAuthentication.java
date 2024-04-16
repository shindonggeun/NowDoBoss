package com.ssafy.backend.global.component.jwt.security;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtTokenAuthentication extends AbstractAuthenticationToken {

    private final MemberLoginActive principal;
    private final Object credentials;

    public JwtTokenAuthentication(MemberLoginActive principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        // 인증이 완료된 것으로 처리합니다. 이 부분은 인증 과정에서 반드시 검증이 필요합니다.
        super.setAuthenticated(true); // 고려사항: 인증 상태를 외부에서 설정할 수 있도록 변경
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
