package com.example.backend.model;

import java.util.UUID;

public record TaskDTO(UUID taskId,
                      UUID userId,
                      String taskDescription,
                      String status
) {}
