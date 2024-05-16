package com.ssafy.backend.domain.map.service;

import com.ssafy.backend.domain.map.dto.response.MapResponse;

public interface MapService {
    MapResponse getCommercialAreaCoords(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getAdministrationAreaCoords(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getDistrictAreaCoords(double ax, double ay, double bx, double by) throws Exception;
}
