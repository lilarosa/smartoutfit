package com.tao.smartoutfit.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class ImageStorageService {

    private static final long MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
            "image/avif",
            "image/svg+xml"
    );

    private final Path uploadDir;

    public ImageStorageService(@Value("${smartoutfit.upload-dir:uploads}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public StoredImage store(MultipartFile file) {
        validate(file);

        try {
            Files.createDirectories(uploadDir);

            String originalFilename = file.getOriginalFilename();
            String extension = extensionOf(originalFilename, file.getContentType());
            String newFilename = UUID.randomUUID() + extension;
            Path destinationFile = uploadDir.resolve(newFilename).normalize();

            file.transferTo(destinationFile);

            return new StoredImage("/uploads/" + newFilename, originalFilename);
        } catch (IOException e) {
            throw new ImageStorageException("Failed to store image", e);
        }
    }

    public void deleteIfLocalUpload(String imageUrl) {
        if (imageUrl == null || !imageUrl.startsWith("/uploads/")) {
            return;
        }

        String filename = imageUrl.substring("/uploads/".length());
        if (filename.isBlank() || filename.contains("/") || filename.contains("..")) {
            return;
        }

        try {
            Files.deleteIfExists(uploadDir.resolve(filename).normalize());
        } catch (IOException e) {
            throw new ImageStorageException("Failed to delete image", e);
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ImageStorageException("Image file is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new ImageStorageException("Image file is larger than 5 MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
            throw new ImageStorageException("Unsupported image type");
        }
    }

    private String extensionOf(String filename, String contentType) {
        if (filename == null || !filename.contains(".")) {
            return switch (contentType == null ? "" : contentType.toLowerCase(Locale.ROOT)) {
                case "image/jpeg" -> ".jpg";
                case "image/png" -> ".png";
                case "image/webp" -> ".webp";
                case "image/heic" -> ".heic";
                case "image/heif" -> ".heif";
                case "image/avif" -> ".avif";
                case "image/svg+xml" -> ".svg";
                default -> "";
            };
        }

        String extension = filename.substring(filename.lastIndexOf("."));
        return extension.toLowerCase(Locale.ROOT);
    }
}
