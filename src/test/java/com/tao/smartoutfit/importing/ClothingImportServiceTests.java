package com.tao.smartoutfit.importing;

import com.tao.smartoutfit.image.ImageStorageService;
import com.tao.smartoutfit.image.StoredImage;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ClothingImportServiceTests {

    @Test
    void createsDraftsWithFilenameBasedSuggestions() throws IOException {
        ClothingImportService service = new ClothingImportService(new FakeImageStorageService());
        MockMultipartFile file = new MockMultipartFile(
                "files",
                "black-wool-coat-work.jpg",
                "image/jpeg",
                "fake".getBytes()
        );

        List<ClothingImportDraft> drafts = service.preview(new MockMultipartFile[]{file});

        assertThat(drafts).hasSize(1);
        ClothingImportDraft draft = drafts.get(0);
        assertThat(draft.imageUrl()).isEqualTo("/uploads/black-wool-coat-work.jpg");
        assertThat(draft.category()).isEqualTo("outerwear");
        assertThat(draft.color()).isEqualTo("black");
        assertThat(draft.material()).isEqualTo("wool");
        assertThat(draft.occasion()).isEqualTo("work");
        assertThat(draft.specialCare()).isTrue();
    }

    private static class FakeImageStorageService extends ImageStorageService {
        FakeImageStorageService() {
            super("uploads");
        }

        @Override
        public StoredImage store(org.springframework.web.multipart.MultipartFile file) {
            return new StoredImage("/uploads/" + file.getOriginalFilename(), file.getOriginalFilename());
        }
    }
}
