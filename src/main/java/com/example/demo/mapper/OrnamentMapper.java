package com.example.demo.mapper;

import com.example.demo.dto.OrnamentRequest;
import com.example.demo.dto.OrnamentResponse;
import com.example.demo.model.Ornament;

public class OrnamentMapper {
    public static Ornament toEntity(OrnamentRequest req) {
        Ornament p = new Ornament();
        p.setName(req.getName());
        p.setPrice(req.getPrice());
        p.setColour(req.getColour());
        p.setSize(req.getSize());
        return p;
    }
    public static OrnamentResponse toResponse(Ornament p) {
        OrnamentResponse res = new OrnamentResponse();
        res.setId(p.getId());
        res.setName(p.getName());
        res.setPrice(p.getPrice());
        res.setColour(p.getColour());
        res.setSize(p.getSize());
        return res;
    }
}