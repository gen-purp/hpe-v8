import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  Star,
  Filter,
  Search
} from 'lucide-react';
import './LeadsCRM.css';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  contacted_at?: string;
  closed_at?: string;
}

const LeadsCRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, priorityFilter]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(lead => lead.priority === priorityFilter);
    }

    setFilteredLeads(filtered);
  };

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        fetchLeads(); // Refresh leads
        setSelectedLead(null);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock size={16} />;
      case 'contacted': return <Phone size={16} />;
      case 'qualified': return <CheckCircle size={16} />;
      case 'proposal': return <Edit size={16} />;
      case 'closed_won': return <CheckCircle size={16} />;
      case 'closed_lost': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'contacted': return '#f59e0b';
      case 'qualified': return '#10b981';
      case 'proposal': return '#8b5cf6';
      case 'closed_won': return '#059669';
      case 'closed_lost': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#6b7280';
      case 'medium': return '#f59e0b';
      case 'high': return '#f97316';
      case 'urgent': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="leads-crm">
        <div className="loading">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="leads-crm">
      <div className="crm-header">
        <h2>Leads CRM</h2>
        <div className="crm-stats">
          <div className="stat">
            <span className="stat-number">{leads.length}</span>
            <span className="stat-label">Total Leads</span>
          </div>
          <div className="stat">
            <span className="stat-number">{leads.filter(l => l.status === 'new').length}</span>
            <span className="stat-label">New</span>
          </div>
          <div className="stat">
            <span className="stat-number">{leads.filter(l => l.status === 'contacted').length}</span>
            <span className="stat-label">Contacted</span>
          </div>
        </div>
      </div>

      <div className="crm-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="closed_won">Closed Won</option>
            <option value="closed_lost">Closed Lost</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="leads-list">
        {filteredLeads.length === 0 ? (
          <div className="no-leads">
            <Users size={48} />
            <h3>No leads found</h3>
            <p>No leads match your current filters.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.id} className="lead-card">
              <div className="lead-header">
                <div className="lead-info">
                  <h3>{lead.name}</h3>
                  <p className="lead-email">{lead.email}</p>
                  {lead.phone && <p className="lead-phone">{lead.phone}</p>}
                </div>
                <div className="lead-status">
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(lead.status) }}
                  >
                    {getStatusIcon(lead.status)}
                    {lead.status.replace('_', ' ')}
                  </div>
                  <div 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(lead.priority) }}
                  >
                    {lead.priority}
                  </div>
                </div>
              </div>
              
              <div className="lead-message">
                <p>{lead.message}</p>
              </div>
              
              <div className="lead-meta">
                <span className="lead-date">
                  <Calendar size={14} />
                  {formatDate(lead.created_at)}
                </span>
                <button 
                  className="edit-button"
                  onClick={() => setSelectedLead(lead)}
                >
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lead Edit Modal */}
      {selectedLead && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Lead</h3>
              <button 
                className="close-button"
                onClick={() => setSelectedLead(null)}
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => setSelectedLead({
                    ...selectedLead,
                    status: e.target.value as Lead['status']
                  })}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="closed_won">Closed Won</option>
                  <option value="closed_lost">Closed Lost</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={selectedLead.priority}
                  onChange={(e) => setSelectedLead({
                    ...selectedLead,
                    priority: e.target.value as Lead['priority']
                  })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={selectedLead.notes || ''}
                  onChange={(e) => setSelectedLead({
                    ...selectedLead,
                    notes: e.target.value
                  })}
                  rows={4}
                  placeholder="Add notes about this lead..."
                />
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setSelectedLead(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => updateLead(selectedLead.id, {
                  status: selectedLead.status,
                  priority: selectedLead.priority,
                  notes: selectedLead.notes
                })}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsCRM;

