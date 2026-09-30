import * as ImagePicker from 'expo-image-picker';

export type EvidenceSource = 'camera' | 'gallery';

export type EvidencePickResult =
  | { status: 'selected'; uri: string }
  | { status: 'cancelled' }
  | { status: 'denied'; source: EvidenceSource }
  | { status: 'failed'; source: EvidenceSource };

const pickerOptions = {
  mediaTypes: ['images'] as ImagePicker.MediaType[],
  quality: 0.7,
};

export function evidenceNotice(result: Exclude<EvidencePickResult, { status: 'selected' }>): string {
  if (result.status === 'cancelled') {
    return 'No image selected. You can try again.';
  }
  if (result.status === 'denied' && result.source === 'gallery') {
    return 'Gallery access is off. Try again, or choose a camera photo.';
  }
  if (result.status === 'denied') {
    return 'Camera access is off. Try again, or choose a gallery photo.';
  }
  if (result.source === 'gallery') {
    return 'The gallery could not be opened. Try again, or take a camera photo.';
  }
  return 'The camera could not be opened. Try again, or choose a gallery photo.';
}

export async function pickEvidence(source: EvidenceSource): Promise<EvidencePickResult> {
  try {
    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return { status: 'denied', source };
    }

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(pickerOptions)
        : await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (result.canceled || !result.assets[0]?.uri) {
      return { status: 'cancelled' };
    }

    return { status: 'selected', uri: result.assets[0].uri };
  } catch {
    return { status: 'failed', source };
  }
}
