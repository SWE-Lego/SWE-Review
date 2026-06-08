#!/bin/bash
# Serve SWE-Review-Mixed-6K-8B (mixed-trained reviewer+generator) via vLLM

conda activate vllm

python -m vllm.entrypoints.openai.api_server \
    --model SWE-Lego/SWE-Review-Mixed-6K-8B \
    --served-model-name SWE-Review-Mixed-6K-8B \
    --host 0.0.0.0 \
    --port 8000 \
    --tensor-parallel-size 4 \
    --gpu-memory-utilization 0.9 \
    --max-model-len 131072 \
    --max-num-seqs 24 \
    --enable-auto-tool-choice \
    --tool-call-parser hermes \
    --chat-template-content-format string \
    --api-key "dummy-key"
