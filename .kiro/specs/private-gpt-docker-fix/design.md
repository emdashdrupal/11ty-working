# Design Document

## Overview

This design addresses the systematic resolution of Docker deployment issues for PrivateGPT on a Kubuntu machine. The solution involves cleaning up existing artifacts, fixing configuration mismatches, resolving port conflicts, and implementing proper health checks to ensure reliable container orchestration.

## Architecture

The PrivateGPT Docker setup consists of multiple service profiles:

1. **Ollama Profile Services**:
   - `ollama-cpu`: Core Ollama service running the LLM
   - `ollama`: Traefik reverse proxy for load balancing
   - `private-gpt-ollama-eduard`: PrivateGPT application using Ollama backend

2. **LlamaCPP Profile Services**:
   - `private-gpt-llamacpp-cpu`: Standalone PrivateGPT with ROCm-enabled LlamaCPP for AMD GPUs

3. **Network Configuration**:
   - Custom network: `private-gpt-edwork`
   - Port mappings for external access
   - Internal service communication

## Components and Interfaces

### Configuration Issues Identified

1. **Port Mismatch**:
   - Router.yml expects Ollama on port 11434
   - Docker-compose.yaml configures Ollama on port 11437
   - Current system shows ports 8088 and 11437 already in use

2. **Health Check Problems**:
   - Inconsistent health check URLs between services
   - Improper dependency chains
   - Timeout values may be too aggressive

3. **Service Dependencies**:
   - `private-gpt-ollama-eduard` depends on both `ollama-cpu` and `ollama`
   - Circular dependency potential with Traefik proxy

### Cleanup Component

**Purpose**: Remove all existing Docker artifacts and free up ports

**Functions**:
- Container cleanup (running and stopped)
- Image cleanup (built and pulled)
- Volume cleanup (named and anonymous)
- Network cleanup
- Port conflict resolution

### Configuration Validation Component

**Purpose**: Validate Docker Compose configuration before deployment

**Functions**:
- YAML syntax validation
- Port conflict detection
- Volume path verification
- Environment variable validation
- Image availability checking

### Health Check Optimization Component

**Purpose**: Fix and optimize container health checks

**Key Changes**:
- Standardize Ollama port to 11434 across all configurations
- Adjust health check timeouts and intervals
- Fix dependency order
- Implement proper wait conditions

### Deployment Component

**Purpose**: Deploy PrivateGPT with proper profile selection

**Profiles**:
- `ollama-cpu`: For CPU-based Ollama deployment
- `llamacpp-cpu`: For AMD GPU-accelerated LlamaCPP deployment with ROCm support
- Default profile maps to `ollama-cpu`

**ROCm Configuration**:
- AMD GPU device mapping: `/dev/kfd` and `/dev/dri`
- ROCm-enabled Docker image: `zylonai/private-gpt:0.6.2-llamacpp-cpu-rocm`
- Proper AMD GPU detection and utilization

## Data Models

### Port Configuration
```yaml
Standard Ports:
  - Ollama Internal: 11434
  - Ollama External: 11437
  - Traefik Dashboard: 8088
  - PrivateGPT Ollama: 8004
  - PrivateGPT LlamaCPP: 8091
```

### Health Check Configuration
```yaml
Health Check Standards:
  - Interval: 30s (standard), 15s (critical services)
  - Timeout: 10s (standard), 30s (slow services)
  - Retries: 3-5 (based on service criticality)
  - Start Period: 20-40s (based on service startup time)
```

### Volume Mappings
```yaml
Volume Structure:
  - ./local_data -> /home/worker/app/local_data (PrivateGPT data)
  - ./models -> /root/.ollama (Ollama models)
  - ./models -> /home/worker/app/models (LlamaCPP models)
```

## Error Handling

### Port Conflict Resolution
- Detect processes using target ports
- Provide options to kill conflicting processes
- Suggest alternative port configurations
- Validate port availability before deployment

### Container Startup Failures
- Implement progressive health check timeouts
- Provide detailed error logging
- Implement automatic retry mechanisms
- Clear dependency resolution order

### Configuration Validation Errors
- YAML syntax error reporting
- Missing file/directory creation
- Environment variable validation
- Docker image availability checking

## Testing Strategy

### Pre-deployment Testing
1. **Configuration Validation Tests**:
   - YAML syntax validation
   - Port availability testing
   - Volume path validation
   - Environment variable checking

2. **Cleanup Verification Tests**:
   - Verify all containers removed
   - Verify all images cleaned
   - Verify ports freed
   - Verify volumes cleaned

### Post-deployment Testing
1. **Health Check Validation**:
   - All services report healthy
   - Health endpoints respond correctly
   - Service dependencies working

2. **Functional Testing**:
   - Web interface accessibility
   - Basic query processing
   - Log analysis for errors
   - Restart reliability testing

### Integration Testing
1. **Profile Testing**:
   - Test ollama-cpu profile deployment
   - Test llamacpp-cpu profile deployment
   - Test profile switching

2. **Network Testing**:
   - Internal service communication
   - External port accessibility
   - Proxy routing functionality

## Implementation Approach

### Phase 1: Environment Cleanup
- Stop and remove existing containers
- Clean up Docker images and volumes
- Resolve port conflicts
- Prepare clean environment

### Phase 2: Configuration Fixes
- Fix port mismatch between router.yml and docker-compose.yaml
- Optimize health check configurations
- Validate all configuration files
- Update environment variables

### Phase 3: Deployment and Validation
- Deploy with proper profile selection
- Validate all services start correctly
- Test health checks and dependencies
- Verify functional operation

### Phase 4: Documentation and Monitoring
- Document working configuration
- Create troubleshooting guide
- Implement monitoring checks
- Test restart procedures

## AMD GPU and ROCm Considerations

### ROCm Requirements
- Verify ROCm drivers are installed on the host system
- Ensure AMD GPU is properly detected (`rocm-smi` command availability)
- Validate `/dev/kfd` and `/dev/dri` device access permissions
- Check ROCm version compatibility with the Docker image

### GPU Resource Management
- Monitor GPU memory usage during model loading
- Implement proper GPU resource cleanup on container shutdown
- Configure appropriate memory limits for GPU-accelerated containers
- Handle GPU initialization failures gracefully

### Performance Optimization
- Optimize ROCm environment variables for AMD GPU performance
- Configure proper GPU memory allocation strategies
- Monitor GPU utilization and thermal management
- Implement GPU-specific health checks