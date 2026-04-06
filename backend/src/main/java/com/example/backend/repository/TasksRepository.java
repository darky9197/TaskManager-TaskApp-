package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TasksRepository extends JpaRepository<Task, UUID> {

    List<Task> findByUsers_UserId(UUID userId);
}
