package com.example.demo.event;

import com.example.demo.model.Ornament;
import org.springframework.context.ApplicationEvent;

public class OrnamentCreatedEvent extends ApplicationEvent {
    private final Ornament ornament;

    public OrnamentCreatedEvent(Object source, Ornament ornament) {
        super(source);
        this.ornament = ornament;
    }

    public Ornament getOrnament() {
        return ornament;
    }
}

