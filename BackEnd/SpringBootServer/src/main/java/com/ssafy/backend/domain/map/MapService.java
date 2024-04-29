package com.ssafy.backend.domain.map;

import java.util.List;
import java.util.Map;

public interface MapService {
    MapResponse getCommercialAreaCoords(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getAdministrationAreaCoords(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getDistrictAreaCoords(double ax, double ay, double bx, double by) throws Exception;

    MapResponse getDistricts(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getAdministrations(double ax, double ay, double bx, double by) throws Exception;
    MapResponse getCommercials(double ax, double ay, double bx, double by) throws Exception;
}
