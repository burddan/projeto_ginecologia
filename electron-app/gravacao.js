
function iniciarGravacao(camera, statusGravacao,chunksGravados,gravacaoStatus,gravadorMedia) {
    statusGravacao.style.display = "block";
    chunksGravados = [];
    gravadorMedia = new MediaRecorder(camera, {
      mimeType: "video/webm; codecs=vp8"
    });

    gravadorMedia.ondataavailable = e => {
      if (e.data.size > 0) {
        chunksGravados.push(e.data);
      }
    };

    gravadorMedia.onstop = async () => {
      const blob = new Blob(chunksGravados, { type: "video/webm" });
      const buffer = await blob.arrayBuffer();

      const filename = `Video-${Date.now()}.webm`;
      const path = await window.electronAPI.salvarArquivo({ buffer, filename });

    };

    gravadorMedia.start();
    gravacaoStatus = true;
  }


  function pararGravacao() {
    statusGravacao.style.display = "none";
    gravadorMedia.stop();
    gravacaoStatus = false;
  }