import { Injectable } from "@angular/core";

@Injectable()
export class SoundService {
  context?: AudioContext;
  buffers: AudioBuffer[] = [];

  initialize() {
    // load wav files for each piano key.
    console.log("initializing audio and loading sounds");
    try {
      // Hack to support AudioContext on iOS
      if (typeof AudioContext !== 'undefined') {
        this.context = new AudioContext();
      } else if (typeof (window as any).webkitAudioContext !== 'undefined') {
        this.context = new (window as any).webkitAudioContext();
      }
      this.loadSounds();
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }
  }

  private loadSounds(): void {
    // load the wav files for each piano key and store it to buffer
    for (let i: number = 16; i < 65; i++) {
      const soundPath = `./assets/sounds/${i}.wav`;
      this.loadBuffer(i.toString(), soundPath);
    }
  }

  private loadBuffer(keyId: string, path: string): void {
    const request = new XMLHttpRequest();

    request.open("GET", path, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      if (this.context) {
        this.context.decodeAudioData(
          request.response,
          (buffer: AudioBuffer) => {
            if (!buffer) {
              alert('error decoding file data: ' + path);
              return;
            }
            // store decode file to buffers
            this.buffers[Number(keyId)] = buffer;
          },
          (error: DOMException) => {
            console.error('decodeAudioData error', error);
          }
        );
      }
    }

    request.onerror = () => alert('BufferLoader: XHR error');
    request.send();
  }

  playNote(keyId: number): void {
    if (this.buffers!.hasOwnProperty(keyId)) {
      const source = this.context!.createBufferSource();
      source.buffer = this.buffers![keyId];
      source.connect(this.context!.destination);
      source.start(0);
    } else {
      console.log("Audio not loaded for key=" + keyId);
    }
  }
}