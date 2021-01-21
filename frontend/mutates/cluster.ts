import { IDetector } from '@/types/detector';
import { ICluster } from "@/types/cluster"
import { mutate } from "swr"

export const addClusterMutate = (url: string, name: string, title: string) => {
  mutate(url, async (clusters: ICluster[]) => {
    if (clusters) {
      const cluster: ICluster = {
        id: (clusters[clusters.length - 1]?.id + 1) ?? 0,
        name,
        title: title,
        cluster_detectors: [],
      };
      const newClusters = [...clusters, cluster];
      return newClusters;
    }
  }, false)
}

export const deleteClusterMutate = (url: string, detectorUrl: string, id: number) => {
  mutate(url, async (clusters: ICluster[]) => {
    if (clusters) {
      const cluster = clusters
        .find(cluster => cluster.id === id);
      if (cluster && cluster.cluster_detectors.length !== 0) {
        mutate(detectorUrl, async (detectors: IDetector[]) => {
          if (detectors) {
            return [...detectors, ...cluster.cluster_detectors];
          }
        }, false);
      }
      return clusters
        .filter(cluster => cluster.id !== id);
    }
  }, false)
}

export const changeClusterMutate = (clusterUrl: string, detectorUrl: string, from: number, to: number, detector: IDetector) => {
  if (to === 0) {
    mutate(detectorUrl, async (detectors: IDetector[]) => {
      if (detectors) {
        const newDetectors = [
          ...detectors, detector
        ]
        return newDetectors;
      }
    }, false)

    mutate(clusterUrl, async (clusters: ICluster[]) => {
      if (clusters) {
        const newClusters = clusters.map(cluster => {
          let newCluster = { ...cluster };
          if (cluster.id === from) {
            newCluster.cluster_detectors = cluster.cluster_detectors
              .filter(p => p.id !== detector.id)
          }
          return newCluster;
        })
        return newClusters;
      }
    }, false)

  } else {
    if (from === 0) {
      mutate(detectorUrl, async (detectors: IDetector[]) => {
        if (detectors) {
          const newDetectors = detectors
            .filter(p => p.id !== detector.id);
          return newDetectors;
        }
      }, false)

      mutate(clusterUrl, async (clusters: ICluster[]) => {
        if (clusters) {
          const newClusters = clusters.map(cluster => {
            let newCluster = { ...cluster };
            if (cluster.id === to) {
              newCluster.cluster_detectors = [...cluster.cluster_detectors, detector];
            }
            return newCluster;
          })
          return newClusters;
        }
      }, false)
    } else {
      mutate(clusterUrl, async (clusters: ICluster[]) => {
        if (clusters) {
          const newClusters = clusters.map(cluster => {
            let newCluster = { ...cluster };
            if (cluster.id === from) {
              newCluster.cluster_detectors = cluster.cluster_detectors
                .filter(p => p.id !== detector.id)
            }
            if (cluster.id === to) {
              newCluster.cluster_detectors = [...cluster.cluster_detectors, detector];
            }
            return newCluster;
          })
          return newClusters;
        }
      }, false)
    }

  }
}
