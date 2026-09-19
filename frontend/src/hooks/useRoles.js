import { useState, useEffect } from 'react';
import { roleService } from '../services/roleService';

export function useRoles(filters = {}) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    roleService.getInternalRoles(filters)
      .then(data => {
        if (mounted) setRoles(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [JSON.stringify(filters)]);

  return { roles, loading, setRoles };
}
