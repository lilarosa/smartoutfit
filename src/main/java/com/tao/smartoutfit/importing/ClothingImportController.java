package com.tao.smartoutfit.importing;

import com.tao.smartoutfit.image.ImageStorageException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clothes/import")
public class ClothingImportController {

    private static final int MAX_BATCH_SIZE = 30;

    private final ClothingImportService clothingImportService;

    public ClothingImportController(ClothingImportService clothingImportService) {
        this.clothingImportService = clothingImportService;
    }

    @PostMapping("/preview")
    public ResponseEntity<?> preview(@RequestParam("files") MultipartFile[] files) {
        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "No files uploaded"));
        }
        if (files.length > MAX_BATCH_SIZE) {
            return ResponseEntity.badRequest().body(Map.of("error", "Upload at most 30 images at once"));
        }

        try {
            List<ClothingImportDraft> drafts = clothingImportService.preview(files);
            return ResponseEntity.ok(drafts);
        } catch (ImageStorageException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
