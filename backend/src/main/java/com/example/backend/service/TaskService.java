package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.TaskDTO;
import com.example.backend.model.Users;
import com.example.backend.repository.TasksRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    private final TasksRepository tasksRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TasksRepository tasksRepository,
                       UserRepository userRepository){
        this.tasksRepository = tasksRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO> fetchTasks(UUID id) {
        return tasksRepository
                .findByUsers_UserId(id)
                .stream()
                .map(this::convetToTaskDto)
                .toList();
    }

    private TaskDTO convetToTaskDto(Task task) {
        return new TaskDTO(
                task.getTaskId(),
                task.getUsers().getUserId(),
                task.getTaskDescription(),
                task.getStatus()
        );
    }

    @Transactional
    public String addTask(Task task, String id) throws UsernameNotFoundException{
        Users user = userRepository.findById(UUID.fromString(id))
                .orElseThrow(()-> new UsernameNotFoundException("username not found!!"));

        Task newTask = new Task();
        newTask.setTaskDescription(task.getTaskDescription());
        newTask.setStatus("ASSIGNED");

        user.addTask(newTask);
        userRepository.save(user);

        return "task added!!";
    }

    public String updateTaskStatus(UUID taskId) {
        try{
            Task task = tasksRepository.findById(taskId)
                    .orElseThrow(()-> new RuntimeException("Id not found"));
            task.setStatus("COMPLETED");
            tasksRepository.save(task);
            return "Updated Successfully !!"+task.getStatus() ;
        }catch (Exception e){
            return "Id not Found!!";
        }
    }

    public String deleteTaskById(UUID taskId) {
        try{
            tasksRepository.deleteById(taskId);
            return "Deleted Successfully";
        }catch (Exception e){
            return "Id not found!!";
        }
    }
}
