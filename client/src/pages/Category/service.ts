import { request } from 'umi';

export async function query(
  params: Global.PageParams,
  options?: { [key: string]: any },
) {
  return request<Category.Item>('/api/rule', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function create(options?: { [key: string]: any }) {
  return request<Category.Item>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function update(options?: { [key: string]: any }) {
  return request<Category.Item>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function remove(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
