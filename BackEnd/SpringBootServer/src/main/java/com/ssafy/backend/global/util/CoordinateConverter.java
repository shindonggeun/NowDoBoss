package com.ssafy.backend.global.util;

import org.geotools.geometry.jts.JTS;
import org.geotools.referencing.CRS;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opengis.referencing.operation.MathTransform;


public class CoordinateConverter {
    private static final GeometryFactory geometryFactory = new GeometryFactory();

    public static Point transform(double x, double y) throws Exception {
        // 입력 좌표계와 출력 좌표계 설정
        CoordinateReferenceSystem sourceCRS = CRS.decode("EPSG:5181");
        CoordinateReferenceSystem targetCRS = CRS.decode("EPSG:4326");

        // 좌표 변환 객체 생성
        MathTransform transform = CRS.findMathTransform(sourceCRS, targetCRS, true);

        // 변환할 좌표 생성
        Point sourcePoint = geometryFactory.createPoint(new Coordinate(x, y));
        Point targetPoint = (Point) JTS.transform(sourcePoint, transform);

        return targetPoint;
    }
}

