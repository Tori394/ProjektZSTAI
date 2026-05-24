package com.example.demo.event;

import com.example.demo.model.Ornament;
import org.springframework.context.ApplicationEvent;

public class OrnamentDeletedEvent extends ApplicationEvent {
    private final Ornament ornament;

    public OrnamentDeletedEvent(Object source, Ornament ornament) {
        super(source);
        this.ornament = ornament;
    }

    public Ornament getOrnament() {
        return ornament;
    }
}

