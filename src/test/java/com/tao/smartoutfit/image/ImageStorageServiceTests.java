package com.tao.smartoutfit.image;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ImageStorageServiceTests {

    @TempDir
    Path uploadDir;

    @Test
    void rejectsUnsupportedFileTypes() {
        ImageStorageService service = new ImageStorageService(uploadDir.toString());
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "notes.txt",
                "text/plain",
                "not an image".getBytes()
        );

        assertThatThrownBy(() -> service.store(file))
                .isInstanceOf(ImageStorageException.class)
                .hasMessageContaining("Unsupported image type");
    }

    @Test
    void deletesLocalUploadFilesOnly() throws Exception {
        ImageStorageService service = new ImageStorageService(uploadDir.toString());
        Path image = uploadDir.resolve("sample.webp");
        Files.createDirectories(uploadDir);
        Files.writeString(image, "fake");

        service.deleteIfLocalUpload("/uploads/sample.webp");
        service.deleteIfLocalUpload("/sample-clothes/white-shirt.svg");

        assertThat(image).doesNotExist();
    }
}
