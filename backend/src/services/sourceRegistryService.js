import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let YAMLModule = null;
try {
  YAMLModule = (await import('yaml')).default;
} catch {
  // Graceful fallback if yaml package is absent
}

export class SourceRegistryService {
  constructor() {
    let dirname = '';
    try {
      dirname = path.dirname(fileURLToPath(import.meta.url));
    } catch {
      dirname = process.cwd();
    }

    const candidateRegistryPaths = [
      path.resolve(dirname, '../../../india_sources/india_sources.yaml'),
      path.resolve(process.cwd(), 'india_sources/india_sources.yaml'),
      path.resolve(process.cwd(), '../india_sources/india_sources.yaml'),
      path.resolve(process.cwd(), '../config/india_sources.yaml'),
    ];
    this.registryPath = candidateRegistryPaths.find(p => fs.existsSync(p)) || candidateRegistryPaths[0];

    const candidateDatasetPaths = [
      path.resolve(dirname, '../../../india_sources/datasets/haryana_agri_energy_economics.yaml'),
      path.resolve(process.cwd(), 'india_sources/datasets/haryana_agri_energy_economics.yaml'),
      path.resolve(process.cwd(), '../india_sources/datasets/haryana_agri_energy_economics.yaml'),
      path.resolve(process.cwd(), '../config/datasets/haryana_agri_energy_economics.yaml'),
    ];
    this.datasetsPath = candidateDatasetPaths.find(p => fs.existsSync(p)) || candidateDatasetPaths[0];

    this.sources = [];
    this.studyDatasets = null;
    this.loadRegistry();
  }

  loadRegistry() {
    try {
      if (fs.existsSync(this.registryPath)) {
        const fileContent = fs.readFileSync(this.registryPath, 'utf8');
        if (YAMLModule) {
          try {
            const parsed = YAMLModule.parse(fileContent);
            if (parsed && parsed.sources) {
              this.sources = parsed.sources;
            }
          } catch {}
        }
        if (!this.sources || this.sources.length === 0) {
          const sources = [];
          const blocks = fileContent.split(/\n\s*-\s+source_id:/);
          for (let i = 1; i < blocks.length; i++) {
            const block = blocks[i];
            const idMatch = block.match(/^\s*["']?([^"'\n\r]+)["']?/);
            const nameMatch = block.match(/name:\s*["']?([^"'\n\r]+)["']?/);
            const priorityMatch = block.match(/priority:\s*["']?([^"'\n\r]+)["']?/);
            const urlMatch = block.match(/base_url:\s*["']?([^"'\n\r]+)["']?/);
            if (idMatch && nameMatch) {
              sources.push({
                source_id: idMatch[1].trim(),
                name: nameMatch[1].trim(),
                title: nameMatch[1].trim(),
                priority: priorityMatch ? priorityMatch[1].trim() : 'Tier-1',
                base_url: urlMatch ? urlMatch[1].trim() : '',
              });
            }
          }
          this.sources = sources;
        }
      }
      if (fs.existsSync(this.datasetsPath) && YAMLModule) {
        const fileContent = fs.readFileSync(this.datasetsPath, 'utf8');
        this.studyDatasets = YAMLModule.parse(fileContent);
      }
    } catch (err) {
      console.error('Failed to load source registry or datasets:', err.message);
    }
  }

  getSources(tier = null) {
    if (tier) {
      return this.sources.filter(s => s.priority.toLowerCase() === tier.toLowerCase());
    }
    return this.sources;
  }

  getSourceById(sourceId) {
    return this.sources.find(s => s.source_id === sourceId);
  }

  getStudyDatasets() {
    return this.studyDatasets;
  }
}

export const sourceRegistry = new SourceRegistryService();
