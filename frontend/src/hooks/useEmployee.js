import { useState, useEffect } from 'react';
import { employeeService } from '../services/employeeService';

export function useEmployee(employeeId = 'emp-101') {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    employeeService.getEmployeeProfile(employeeId)
      .then(data => {
        if (mounted) setProfile(data);
      })
      .catch(err => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [employeeId]);

  return { profile, loading, error, setProfile };
}
